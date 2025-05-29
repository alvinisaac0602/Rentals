import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold  my-4 text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Space</span>
        <span className='text-slate-700'>Estates</span>
        </h1>
        <form>
        <input
          type="text"
          placeholder="Search for properties..."
          className=" bg transparent w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      <ul>
        <li className='inline-block mx-2'>
          <a href="/" className='text-white hover:text-blue-500'>Home</a>
        </li>
        <li className='inline-block mx-2'>
          <a href="/about" className='text-white hover:text-blue-500'>About</a>
        </li>
        <li className='inline-block mx-2'>
          <a href="/sign-in" className='text-white hover:text-blue-500'>Sign In</a>
        </li>
        <li className='inline-block mx-2'>
          <a href="/sign-up" className='text-white hover:text-blue-500'>Sign Up</a>
        </li>
      </ul>
      </div>
      
    </header>
  )
}

export default Header
