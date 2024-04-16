import { Document, Page, Text, Image } from "@react-pdf/renderer";
import certImage from "./courseCompletionCertificate2.png"
import { useAuthStore } from "../store/store";


const Certificate = () => {
  const userAuthStateData = useAuthStore.getState().user

  console.log(userAuthStateData);
  return (
    <Document>
    <Page size={{ width: 650, height: 450 }}>
      <Image src={certImage} style={{ width: '100%', height: '100%' }} />
      <Text 
        style={{
            position:"absolute",
            top:"42%",
            left:"38%",fontSize: 20, fontWeight: 'bold'
        }}
      >
        {userAuthStateData.data.name}
      </Text>

      <Text 
        style={{
            position:"absolute",
            bottom:"40%",
            left:"38%",fontSize: 16, fontWeight: 'bold'
        }}
      >
        Option Trading course.
      </Text>
    </Page>
  </Document>
  );
};

export default Certificate;
