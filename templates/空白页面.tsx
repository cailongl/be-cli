import React, {useState} from 'react';

const <%= pageName %>: React.FC<any> = () => {
  const [count, setCount] = useState(1)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>按钮</button>
    </div>
  )
}

export default <%= pageName %>