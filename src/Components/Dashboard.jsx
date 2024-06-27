import { Link } from "react-router-dom";
 import { AiOutlineLogout } from "react-icons/ai";
 import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Dashboard = () => {

  
  const [users, setusers] = useState([]);
  const [search, setSearch] = useState("");
  console.log("this the user that search here !", search);
  const navigate = useNavigate();


  const StoredUser = JSON.parse(localStorage.getItem("users"));
  const Token_ = JSON.parse(localStorage.getItem("token"));
  console.log("this is the data from the users hook", users);
  console.log("this is the token", Token_);

  const getAllUsers = async () => {
    try {
      let result = await fetch("http://localhost:7800/api/v1/users/getAll", {
        method: "GET",
        headers: {
          "Authorization": Token_
        },
    });
      result = await result.json();
      console.log("this is result from getAll", result);
      setusers(result);
      toast.success("All Users")
    } catch (err) {
      console.log("Something went wrong here !");
      toast.error("User not found !")
    }
  };

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
      getAllUsers();
      toast.success("User Deleted Successfully !")
    } catch (err) {
      console.log("Something went wrong while deleting.......");
      toast.error("User not deleted !")
    }
  };

  const Logout = async() => {
    try{
      let result = await fetch("http://localhost:7800/api/v1/users/logout",{
        method: "POST",
        headers: {
          "Authorization": Token_
        }
      });
      result = await result.json();
      localStorage.clear();
      navigate("/")
      toast.success("User Logged out Success !")


    }catch(err){
      console.log("SOmething went wrong !", err);

    }
  }

  const UpdateUser = (id) => {
    navigate(`/dashboard/updateProducts/${id}`)
  }

  

  useEffect(() => {
    getAllUsers();
  }, []);


  const filteredUser = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
  console.log("this is filtered data", filteredUser)
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

            <div className="flex items-center justify-center text-center">
              <Link to="/dashboard/createUser">
                <button className="font-semibold bg-green-200 p-2 rounded">
                  Create User
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <input
              placeholder="search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 bg-slate-200 rounded-md "
              />

            </div>
            <div className="hidden md:flex items-center space-x-4">
              <FaRegUserCircle className="h-[50px] w-[30px]" />
              {Token_ && (
                <div className="text-black font-bold text-[15px]">
                  {`Hi ${StoredUser.name}`}
                </div>
              )}
              <Link
                to="/"
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
              {filteredUser.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border border-gray-300 block md:table-row"
                >
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell text-slate-500 font-bold">
                    {user.name}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell text-slate-500 font-bold">
                    {user.email}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell text-slate-500 font-bold">
                    {user.mobile}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell text-slate-500 font-bold">
                    {user.designation}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell text-slate-500 font-bold">
                    {user.gender}
                  </td>
                  <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell text-slate-500 font-bold">
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
                      className="bg-red-300 px-2 rounded mx-2 text-slate-500 font-bold"
                      onClick={() => DeleteUser(user._id)}
                    >
                      Delete
                    </button>
                    
                      <button className="bg-black text-white px-2 rounded font-bold" onClick={() => UpdateUser(user._id)}>
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