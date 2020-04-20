import React from 'react';
import {fetchrepos} from './fetch'
import PropTypes from 'prop-types';
import {FaUser,FaStar,FaCodeBranch,FaExclamationTriangle} from 'react-icons/fa';
import Battle from './Battle'



function NavItems({selected,UpdateLanguage}){

    const languages=['All','Python','Ruby','Java','C','Php','Go']


    return(   <ul className='flex-center'>
    {languages.map((language)=>(
        <li key={language}>
            
             <button style={ language === selected  ? {color:'red'} : null} 
             onClick={()=>UpdateLanguage(language)} className='btn-clear nav-link'>
                {language} </button> 
        </li>
         ))}
</ul>)
}

NavItems.propTypes={
    selected:PropTypes.string.isRequired,
    UpdateLanguage:PropTypes.func.isRequired
}


function ReposGrid({repos}){


    return(<ul className='grid space-around'>

        {repos.map((repo,index)=>{
                const {name,owner,html_url,stargazers_count,forks,open_issues}=repo;
                const{avatar_url,login}=owner;

               return( <li className='repo bg-light' key={html_url}>

        <h4 className='header-lg text-center'>#{index + 1}</h4>
        <img className='avatar' src={avatar_url} alt='no' />
        <h2 className='center-text'>
        <a href={html_url} className='link' >{login}</a>
        </h2>
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(255,191,166)' size={22} />
                <a href={`https://github.com/${login}`}>{login}</a> 
            </li>
            <li>
                <FaStar color='rgb(129,195,245)' sie={22} />
                {stargazers_count.toLocaleString()} stars
            </li>
            <li>

                <FaCodeBranch color='yellow' sie={22} />
                {forks.toLocaleString()} forks
            </li>
            <li>
                <FaExclamationTriangle color='orange' sie={22} />
                {open_issues.toLocaleString()} Issu
            </li>
        </ul>
               </li>)
        })}

    </ul>)
}

ReposGrid.propTypes={

    repos:PropTypes.array.isRequired
}

export default class Nav extends React.Component{
constructor(props){
super(props);

this.state={
    Selectedlanguage:'All',
    repos:{},
    error:null
}

}
UpdateLanguage=(Selectedlanguage)=>{

    this.setState((repos)=>(
        {Selectedlanguage,error:null,
        })
    )

if(!this.state.repos[Selectedlanguage]){
    
    fetchrepos(Selectedlanguage)
    .then((data)=>{
        console.log(data)
        this.setState(({repos})=>({
           repos:{ ...repos,
            [Selectedlanguage]:data
           }


        }))
    })
    .catch(()=>{

        console.warn('error');



        this.setState({error:'Error occured ...!'})
    })
   
}
}
componentDidMount(){

    this.UpdateLanguage(this.state.Selectedlanguage)
}
isLoading=()=>{
    const {error,repos,Selectedlanguage}=this.state;
    return error === null && !repos[Selectedlanguage]
}
render(){
const {Selectedlanguage,error,repos}=this.state;
return(
<div >

 
<NavItems selected={this.state.Selectedlanguage} UpdateLanguage={this.UpdateLanguage} />
{repos[Selectedlanguage] && <ReposGrid repos={repos[Selectedlanguage]} />}

{this.isLoading() && <p>Loading....</p>}

{error && <p>errorr</p>} 
<Battle />
</div>
);

}

} 


