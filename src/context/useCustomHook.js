import { useState, useEffect, createContext, useContext } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { auth, db, storage } from '../firebase/Firebase';

const AuthContext = createContext();
export const useCustomHook = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const { toggleColorMode } = useColorMode();
  const [darkIcon, setDarkIcon] = useState(false);
  //profile page states
  const [isMe, setIsMe] = useState('');
  const [img, setImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDark = () => {
    setDarkIcon(!darkIcon);
  };
  useEffect(() => {
    //getting data of current user
    if (auth) {
      getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
        if (docSnap.exists) {
          setIsMe(docSnap.data());
        }
      });
    }
    if (img) {
      // Upload file and metadata to the object
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        setIsLoading(true);
        try {
          if (isMe.avatarPath) {
            await deleteObject(ref(storage, isMe.avatarPath));
          }

          const snap = await uploadBytes(imgRef, img);

          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setIsLoading(false);

          setImg('');
        } catch (err) {
          console.log(err.message);
        }
      };

      uploadImg();
    }
  }, [img, isMe.avatarPath]);

  //delete image from storage
  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete avatar?');
      if (confirm) {
        await deleteObject(ref(storage, isMe.avatarPath));

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          avatar: '',
          avatarPath: '',
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const value = {
    darkIcon,
    setDarkIcon,
    handleDark,
    toggleColorMode,
    isMe,
    setImg,
    deleteImage,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
