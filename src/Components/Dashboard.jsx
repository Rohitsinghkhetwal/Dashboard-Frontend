import { Link } from "react-router-dom";
 import { AiOutlineLogout } from "react-icons/ai";
 import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const [users, setusers] = useState([]);

  const StoredUser = JSON.parse(localStorage.getItem("users"));
  const Token_ = JSON.parse(localStorage.getItem("token"));
  console.log("this is the data from the users hook", users);
  console.log("this is the token", Token_);

  const getAllUsers = async () => {
    try {
      let result = await fetch("http://localhost:7800/api/v1/users/getAll", {
        method: "get",
        headers: {
          "Authorization": Token_,
        },
      });
      result = await result.json();
      setusers(result);
    } catch (err) {
      console.log("Something went wrong here !");
    }
  };
  // deleting the user api
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0NDg0ZjhmMWYwYjdmZWY3MGQ2YzAiLCJpYXQiOjE3MTkxNDg5MjUsImV4cCI6MTcxOTMyMTcyNX0.gQpdVnQwGxFn9b4kit_MzASrVXXDEj2c_LGipPdqeXw

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0NDg0ZjhmMWYwYjdmZWY3MGQ2YzAiLCJpYXQiOjE3MTkxNDg5MjUsImV4cCI6MTcxOTMyMTcyNX0.gQpdVnQwGxFn9b4kit_MzASrVXXDEj2c_LGipPdqeXw

  const DeleteUser = async (id) => {
    try {
      if (!Token_) {
        throw new Error("User is not authenticated");
      }
      console.log("this is token from deleteUser api", Token_);
      let deleting = await fetch(
        `http://localhost:7800/api/v1/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": Token_,
            "Content-Type": "application/json",
          },
        }
      );

      deleting = await deleting.json();
      console.log("deleted successfully _");
    } catch (err) {
      console.log("Something went wrong while deleting.......");
    }
  };

  const Logout = () => {
    console.log("Logged out successfully !");
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col">
      <nav className="bg-slate-300 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-black font-bold text-xl">
                Em-Dash
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <FaRegUserCircle className="h-[50px] w-[30px]" />
              {Token_ && (
                <div className="text-black font-bold text-[15px]">
                  {`Hi ${StoredUser.name}`}
                </div>
              )}
              <Link
                to="/logout"
                className="px-4 py-1 rounded-md font-medium pl-[70px]"
              >
                <AiOutlineLogout
                  className="h-[50px] w-[30px]"
                  onClick={Logout}
                />
              </Link>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-300 inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"></button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center pt-10">
        <div className="container mx-auto p-4">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-gray-300 block md:table-row absolute -top-full md:relative md:top-auto -left-full md:left-auto md:w-full">
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Name
                </th>
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Email
                </th>
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Mobile
                </th>
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Designation
                </th>
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Gender
                </th>
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Course
                </th>
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Image
                </th>
                <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border border-gray-300 block md:table-row"
                >
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    {user.name}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    {user.email}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    {user.mobile}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    {user.designation}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    {user.gender}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    {user.course}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                    <img
                      src={user.imageUrl}
                      alt="User"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className=" md:border md:border-gray-300 block md:table-cell">
                    <button
                      className="bg-red-300 px-2 rounded mx-2"
                      onClick={() => DeleteUser(user._id)}
                    >
                      Delete
                    </button>
                    <button className="bg-black text-white px-2 rounded">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
export default Dashboard;