import React, { ChangeEvent } from "react";

interface User {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  mobile: string;
  address1: string;
  address2: string;
}

interface ProfileInfoProps {
  user: User;
  editField: string | null;
  handleEdit: (field: string) => void;
  handleSave: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  user,
  editField,
  handleEdit,
  handleSave,
  handleChange,
}) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Profile Information</h1>
      <div className="space-y-4">
        {/* Name */}
        <div className="flex space-x-4">
          {["firstName", "lastName"].map((field, index) => (
            <div key={index} className="w-1/2 relative">
              <label className="text-gray-600 flex justify-between">
                {field === "firstName" ? "First Name" : "Last Name"}
                {editField !== field ? (
                  <button
                    className="text-blue-500 text-sm"
                    onClick={() => handleEdit(field)}>
                    Edit
                  </button>
                ) : (
                  <button
                    className="text-green-500 text-sm"
                    onClick={handleSave}>
                    Save
                  </button>
                )}
              </label>
              <input
                type="text"
                name={field}
                value={user[field as keyof User]}
                onChange={handleChange}
                className="w-full p-2 border shadow-sm rounded-sm mt-1 outline-[#5858583d]"
                readOnly={editField !== field}
              />
            </div>
          ))}
        </div>

        {/* Gender */}
        <div>
          <label className="text-gray-600 flex justify-between">
            Your Gender
            {editField !== "gender" ? (
              <button
                className="text-blue-500 text-sm"
                onClick={() => handleEdit("gender")}>
                Edit
              </button>
            ) : (
              <button className="text-green-500 text-sm" onClick={handleSave}>
                Save
              </button>
            )}
          </label>

          <div className="flex space-x-4 mt-1">
            {["Male", "Female"].map((g) => (
              <label key={g} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={user.gender === g}
                  onChange={handleChange}
                  disabled={editField !== "gender"}
                  className="shadow-sm "
                />
                <span>{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="text-gray-600 flex justify-between">
            Email Address
            {editField !== "email" ? (
              <button
                className="text-blue-500 text-sm"
                onClick={() => handleEdit("email")}>
                Edit
              </button>
            ) : (
              <button className="text-green-500 text-sm" onClick={handleSave}>
                Save
              </button>
            )}
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border shadow-sm rounded-sm mt-1 outline-[#5858583d]"
            readOnly={editField !== "email"}
          />
        </div>

        {/* Mobile */}
        <div className="relative">
          <label className="text-gray-600 flex justify-between">
            Mobile Number
            {editField !== "mobile" ? (
              <button
                className="text-blue-500 text-sm"
                onClick={() => handleEdit("mobile")}>
                Edit
              </button>
            ) : (
              <button className="text-green-500 text-sm" onClick={handleSave}>
                Save
              </button>
            )}
          </label>
          <input
            type="number"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            className="w-full border rounded-sm shadow-sm px-2 py-2 mt-1 outline-[#5858583d] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            readOnly={editField !== "mobile"}
          />
        </div>

        {/* Address Line 1 */}
        <div className="relative">
          <label className="text-gray-600 flex justify-between">
            Address 1
            {editField !== "address1" ? (
              <button
                className="text-blue-500 text-sm"
                onClick={() => handleEdit("address1")}>
                Edit
              </button>
            ) : (
              <button className="text-green-500 text-sm" onClick={handleSave}>
                Save
              </button>
            )}
          </label>
          <input
            type="text"
            name="address1"
            value={user.address1}
            onChange={handleChange}
            className="w-full p-2 border shadow-sm rounded-sm mt-1 outline-[#5858583d]"
            readOnly={editField !== "address1"}
          />
        </div>

        {/* Address Line 2 */}
        <div className="relative">
          <label className="text-gray-600 flex justify-between ">
            Address 2
            {editField !== "address2" ? (
              <button
                className="text-blue-500 text-sm"
                onClick={() => handleEdit("address2")}>
                Edit
              </button>
            ) : (
              <button className="text-green-500 text-sm" onClick={handleSave}>
                Save
              </button>
            )}
          </label>
          <input
            type="text"
            name="address2"
            value={user.address2}
            onChange={handleChange}
            className="w-full p-2 border shadow-sm rounded-sm mt-1 outline-[#5858583d]"
            readOnly={editField !== "address2"}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
