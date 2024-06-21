import React, { useState } from "react";

const SignupForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [course, setCourse] = useState("");
    const [gender, setGender] = useState("");
    const [designation, setDesignation] = useState("");
    const [imageUrl, setImgUrl] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    console.log(
      "all data here",
      name,
      email,
      mobile,
      course,
      gender,
      designation,
      imageUrl
    );


  const onGenderChange = (e) => {
    setGender(e.target.value);
  }

  const onCourseChange = (e) => {
    setCourse(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setSubmitting(true);
        let response = await fetch("http://localhost:7800/api/v1/users/register", {
            method: "post",
            body: JSON.stringify({name, email, mobile, course, gender, designation, imageUrl}),
            
        });
        response = await response.json();
        console.log("This is the response of data", response);

    }catch(err){
        setError("Something went wrong while signing up !")
    }finally{
        setSubmitting(false);
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill in the form below to create your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="sr-only">
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            {/* Designation */}
            <div>
              <label htmlFor="designation" className="sr-only">
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex items-center">
                <label htmlFor="male" className="inline-flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    onChange={onGenderChange}
                    checked={gender === "Male"}
                    className="form-radio"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label
                  htmlFor="female"
                  className="inline-flex items-center ml-6"
                >
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={onGenderChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
            {/* Courses */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <div className="flex items-center space-x-4">
                <label htmlFor="mca" className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="mca"
                    name="courses"
                    value="MCA"
                    checked={course === "MCA"}
                    onChange={onCourseChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">MCA</span>
                </label>
                <label htmlFor="bca" className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="bca"
                    name="courses"
                    value="BCA"
                    checked={course === "BCA"}
                    onChange={onCourseChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">BCA</span>
                </label>
                <label htmlFor="bsc" className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="bsc"
                    name="courses"
                    value="BSC"
                    checked={course === "BSC"}
                    onChange={onCourseChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">BSC</span>
                </label>
              </div>
            </div>
            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="imageUrl/*"
                required
                value={imageUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
