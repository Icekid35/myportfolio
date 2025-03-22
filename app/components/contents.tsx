import React from 'react'

function Contents({children}:React.PropsWithChildren) {
  return (
    <main className="pt-2 max-w-[99vw]">
        {children}
        </main>
  )
}

export default Contents