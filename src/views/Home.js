import React from 'react'
// import axios from 'axios'
import Button from '../components/Button'
import Input from '../components/Input'
import Repo from '../container/Repo'

export default function Home() {
  // const [username, setUsername] = useState('')
  // const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&redirect_uri=http://localhost:3000/detail`
  const avatar = 'https://avatars.githubusercontent.com/u/72542280?v=4'
  const title = 'arkademy'
  const desc = 'Repository for Arkademy Project'
  const url = 'https://github.com/maulanarifai114/arkademy'
  const branch = 'main'
  const login = (e) => {
    e.preventDefault()
    console.log('login')
  }
  const search = (e) => {
    console.log(e.target.value)
  }
  return (
    <div className="container my-5 d-flex flex-column">
      <Button trigger={login}/>
      <br />
      <Input onchange={search}/>
      <br />
      <Repo
        branch={branch}
        avatar={avatar}
        title={title}
        desc={desc}
        url={url}
      />
    </div>
  )
}
