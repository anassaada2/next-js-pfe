'use client'
import { MdSearch } from "react-icons/md";
import styles from "./search.module.scss";
import {useSearchParams ,useRouter, usePathname} from "next/navigation"

function Search({ placeholder }) {
  const searchParams = useSearchParams()
  const Pathname = usePathname()
  const { replace} = useRouter()
  function handleSearch (term){
const params = new URLSearchParams(searchParams)
if (term) {
  params.set('query',term)
} else {
  params.delete('query')
}
replace(`${Pathname}?${params.toString()}`)
  }
  return (
    <div className={styles.container}>
      <MdSearch />
      <input type="text" placeholder={placeholder} className={styles.input}
      onChange={(e)=>{handleSearch(e.target.value)}}
      defaultValue={searchParams.get('query')?.toString()}
       />
    </div>
  );
}

export default Search;
