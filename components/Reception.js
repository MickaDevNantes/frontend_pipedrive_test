import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

function Reception() {
  const [webhook, setWebhook] = useState([])

  useEffect(()=>{
    fetch('https://backend-pipedrive-test.vercel.app/getWebhook').then(reponse=>reponse.json()).then(data=>{
      setWebhook(data.result)
    })
  }, [])
  
  let listeWebhooks = "Pas de donnée ..."
  if(webhook){
    listeWebhooks = webhook.map((element, i)=><div key={i} style={{border: '1px solid black'}}><p>Action : {element.action}</p><p>Object : {element.object}</p><p>Company ID : {element.company_id}</p><p>User ID : {element.user_id}</p></div>)
  }

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Composant reception
        </h1>
        <p>données : </p>
        {listeWebhooks}
      </main>
    </div>
  );
}

export default Reception;
