import Reception from '../components/Reception';

function ReceptionPage(req, res) {
    if (req.method === 'POST') {
        const payload = req.body;
    
        // Traitez les données reçues
        console.log('Données du webhook reçues:', payload);
    }else{
        console.log("pas de donnee")
    }
  
    return <Reception />;
}

export default ReceptionPage;
