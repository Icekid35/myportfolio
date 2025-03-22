import React from 'react'

function Circles() {
  return (
    <div className="absolute w-[70vw] h-[70vw] top-[calc(100vh-70vw)] left-[calc(100%-33vw)]">
    {[100, 80, 60, 40, 20].map((size, index) => (
      <span
        key={index}
        className="absolute border border-gray-400 rounded-full opacity-10 left-1/2 top-1/2"
        style={{ width: `${size}%`, height: `${size}%`, transform: "translate(-50%, -50%)" }}
      />
    ))}
  </div>
  )
}

export default Circles