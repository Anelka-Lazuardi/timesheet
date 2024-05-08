import Form from "@/components/setting/form";
import { Stack } from '@mui/material';


type Props = {}


const Setting = (props: Props) => {


  return (

    <Stack sx={{ flexGrow: 1, backgroundColor: '#F7F8FB' }} justifyContent={"center"} alignItems={"center"} >
      <Form />
    </Stack>
  )
}

export default Setting