import styles from '../styles/Home.module.css';
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import SurfaceSDK from '@pipedrive/app-extensions-sdk';

function Home() {
  const test = async ()=>{
    const sdk = await new SurfaceSDK();
    await sdk.initialize();
  }
  test()
  const router = useRouter();
  const { code } = router.query;
  const [username, setUsername] = useState('')
  
  let url = `https://backend-pipedrive-test.vercel.app/login/?code=${code}`

  fetch(url).then(reponse=>reponse.json()).then(data=>{
    console.log(data)
    if(data.result && data.token){
      fetch('https://api-proxy.pipedrive.com/users/me',{
        headers: {Authorization: `Bearer ${data.token}`}
      }).then(reponse=>reponse.json()).then(data2=>{
        if(data2.success){
          setUsername(data2.data.name)
        }
      }
      )

      fetch('https://api-proxy.pipedrive.com/api/v2/deals/1',{
        headers: {Authorization: `Bearer ${data.token}`}
      }).then(reponse=>reponse.json()).then(data2=>{
        console.log(data2)
      }
      )

      // fetch('https://api-proxy.pipedrive.com/api/v1/webhooks',{
      //   method: 'POST',
      //   headers: {Authorization: `Bearer ${data.token}`},
      //   body: new URLSearchParams({
      //     subscription_url: "https://backend-pipedrive-test.vercel.app/reception",
      //     event_action: "*",
      //     event_object: "*",
      //   })
      // }).then(reponse=>reponse.json()).then(data2=>{
      //   console.log("webhook: ", data2)
      // }
      // )
    }
  })
  

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome {username}
        </h1>
      </main>
    </div>
  );
}

export default Home;
