import React, {useRef} from 'react';
import {IoIosChatboxes} from 'react-icons/io'; // https://react-icons.github.io/react-icons/
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import {useDispatch, useSelector} from 'react-redux';
import firebase from 'firebase';
import mime from 'mime-types';
import {setPhotoUrl} from '../../../redux/actions/user_action';

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => firebase.auth().signOut();
  const inputOpenImageRef = useRef(null);

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const metadata = {contentType: mime.lookup(file.name)};
    console.log(file);

    try {
      // 파베 스토리지에 파일 저장하기
      let updateTaskSnapshot = await firebase.storage().ref().child(`user_images/${user.uid}`).put(file, metadata);
      console.log(updateTaskSnapshot);

      // 프로필 이미지 수정
      let downloadUrl = await updateTaskSnapshot.ref.getDownloadURL();
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadUrl
      });

      // redux store 정보 수정 ( 화면 UI )
      dispatch(setPhotoUrl(downloadUrl));

      // firebase database 에 user 이미지 수정
      await firebase.database().ref('users').child(user.uid).update({
        image: downloadUrl
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      {/* logo */}
      <h3 style={{color: 'white'}}>
        <IoIosChatboxes />
        Chat App
      </h3>

      <div style={{display: 'flex', marginBottom: '1rem'}}>
        <Image src={user && user.photoURL} style={{width: '30px', height: '30px', marginTop: '3px '}} roundedCircle />
        <Dropdown>
          <Dropdown.Toggle style={{backgroundColor: 'transparent', border: '0px'}} id="dropdown-basic">
            {user?.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <input
        type={'file'}
        ref={inputOpenImageRef}
        style={{display: 'none'}}
        accept={('image/jpeg', 'image/png')}
        onChange={handleUploadImage}
      />
    </div>
  );
}

export default UserPanel;
