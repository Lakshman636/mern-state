import { useState } from "react";
import { useSelector } from "react-redux"
import {updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserSuccess,deleteUserStart, signOutUserStart} from "../redux/user/userSlice"
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';

export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user)
  
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const handleChange =(e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
       dispatch(updateUserSuccess(data));
       setUpdateSuccess(true);
    
    } catch (error) {
       dispatch(updateUserFailure(error.message));
    }
  };
  // delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method:'DELETE',
        });
      const data = await res.json();
      if (data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
       dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
         dispatch(deleteUserFailure(data.message));
         return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 " />
        <input type="text" placeholder="username" defaultValue = {currentUser.username} id='username' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="email" defaultValue = {currentUser.email} id='email' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="password" id='password' className="border p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' > 
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' 
        to={"/create-listing"}>
        Create Listing 
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut}className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'> {error ? error : ''}</p>
      <p className='text-green-700 mt-5'> {updateSuccess ? "User is updated successfully!" : ''}</p>
    </div>
  )
}
