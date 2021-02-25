import React, { useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import Input from '../components/Input'
import Repo from '../container/Repo'

export default function Home() {
  const [repos, setRepos] = useState([])
  const [searching, setSearch] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo&redirect_uri=${process.env.REACT_APP_BASE_URL}/private`
  const login = (e) => {
    e.preventDefault()
    const win = window.open(url, '_blank');
    win.focus();
  }
  const inputed = (e) => {
    setSearch(e.target.value)
  }
  const updatePage = (page) => {
    return new Promise ((res, rej) => {
      let oldVal = page
      let newVal = page + 5
      setPage(newVal)
      oldVal !== newVal ? res(newVal) : rej('error')
    }) 
  }
  const getRepo = () => {
    updatePage(page)
      .then((res) => {
        console.log(res)
        axios.get(`${process.env.REACT_APP_API_URL}/search/repositories?q=${searching}&order=desc&per_page=${res}`)
          .then((response) => {
            setTotal(response.data.total_count)
            setRepos(() => response.data.items)
          })
          .catch((err) => console.log(err.response.data.message))
      })
      .catch((err) => console.log(err))
  }
  const search = (e) => {
    if (e.charCode === 13) {
      if (searching === '') {
        setRepos([])
        setPage(0)
      } else {
        getRepo()
      }
    }
  }
  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      getRepo()
    }
  }
  return (
    <div className="container my-5 d-flex flex-column">
      <Button trigger={login} />
      <br />
      <Input onchange={inputed} onenter={search} placeholder="Search Repositories" />
      <br />
      {repos.length !== 0 && <h4>Total Search {total}</h4>}
      <br />
      {repos.map(item => 
        <Repo
          branch={item.default_branch}
          avatar={item.owner.avatar_url}
          title={item.name}
          desc={item.description}
          fork={item.forks}
          url={item.html_url}
          key={item.id}
        />
      )}
    </div>
  )
}
