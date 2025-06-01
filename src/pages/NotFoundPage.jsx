const NotFoundPage = () => {
  return (
    <div className='w-full h-screen bg-black'>
      <div className='pt-[100px] text-green-400 flex flex-col justify-center items-center gap-5'>
        <h3 className="mt-20 font-light">
          Couldn't find page with requested URL that you searched for.
        </h3>
        <h1 className="font-bold text-xl">404. That's an error.</h1>
        <p className="font-light">
          Try typping again or use navigation bar at the top.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage