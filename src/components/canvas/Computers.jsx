import {Suspense, useEffect, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import { OrbitControls, Preload,useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'

const Computers = ({isMobile}) => {

  const computer = useGLTF("/desktop_pc/scene.gltf")
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black'/> // 2 dòng này code dùng để điều chỉnh độ sáng
      <pointLight intensity={0.5}/> // pointLight dùng để cho có hướng đèn
      <spotLight 
        position={[-20,50,10]} // vị trí của độ sáng
        angle={0.12} // thay đổi góc của độ sáng 
        penumbra={1} // góc tối 
        castShadow
        shadow-mapSize={1024}
        />
      <primitive 
        object={computer.scene} // hiển thị 1 đối tượng máy tính
        scale={isMobile? 0.7 : 0.75} //
        position={isMobile ? [0,-3,-2.2]: [0,-3.25, -1.5]}
        rotation={[-0.01,-0.1,-0.01]}// thuộc tính xoay 
      /> // thẻ primitive dùng để lấy đối tượng máy tính ban đầu
    </mesh>
  )
}

const ComputersCanvas=()=>{

  const [isMobile, setIsMobile]= useState(false);

  useEffect(()=>{
    const mediaQuery= window.matchMedia('(max-width:500)');// window.matchMedia là 1 phương thức kiểm tra độ rộng hiện tại của trình duyệt và sau đó tạo 1 đối tượng truy vấn phương tiện xem chiều rộng tối đa của cửa số có phải 500pixel trở xuống hay không

    //đặt gía trị ban đầu cho biến isMobile
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange= (event)=>{{
      setIsMobile(event.matches)
    };
    
    // thêm chức năng 
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // remove the listener when the component is unmounted
    return ()=>{
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }

  }
  },[]);

  return (
      <Canvas 
        frameloop='demand'
        shadows
        camera={{position:[20,3,5], fov:25}}
        gl={{preserveDrawingBuffer:true}}
      >
        <Suspense fallback={<CanvasLoader/>}> // thẻ này dùng để khi  giao diện bị treo thì chuyẻn đến CanvasLoad
          <OrbitControls 
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={Math.PI / 2}
          />
          <Computers  isMobile={isMobile}/> 
        </Suspense>
        <Preload all />  
      </Canvas>  
  )
}

export default ComputersCanvas