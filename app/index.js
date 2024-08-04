import { Redirect} from 'expo-router'
const index = () => {
  return (
    <Redirect href="/(authentication)/login" />
  )
}

export default index