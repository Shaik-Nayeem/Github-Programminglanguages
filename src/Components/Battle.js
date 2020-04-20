import React,{Component} from 'react';
import { FaTrophy,FaUserFriends,FaFighterJet } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Instructions=()=>{

    return(

        <div className='instructions-container'>
            <h1 className='center-text header-lg'>Instructions</h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className='header-sm'>Enter two git repos</h3>
                    <FaUserFriends className='bg-light' color='rgb(255,191,116)' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className='bg-light' color='#727272' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>Enter two git repos</h3>
                    <FaTrophy className='bg-light' color='rgb(255,215,0)' size={140} />
                </li>
            </ol>
        </div>
    )
}



class FormP extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:''}
    }

    handlesubmit=(e)=>{
        e.preventDefault();
        this.props.onSubmit(this.state.username)

    }
    handleformvalues=(event)=>{
        
        this.setState({username:event.target.value})
    }

    render(){
        return( 
            <form className='column player' onSubmit={this.handlesubmit} >
                <label htmlFor='username' className='player-label'>
                    <div className='row player-inputs'>
                        <input 
                        type='text'
                        id='username'
                        className='input-light'
                        placeholder='github player'
                        autoComplete='off'
                        value={this.state.username}
                        
                        onChange={this.handleformvalues}
                        />

                        <button className='btn'
                        disabled={!this.state.username}
                        // style={this.state.username ? 'background'='black' :null}
                        
                        type='submit'

                        >
                            Button
                        </button>
                    </div>
                </label>
            </form>
        )
    }
}

FormP.propTypes={
    onSubmit:PropTypes.func.isRequired
}
export default class Battle extends React.Component{
constructor(props){
super(props);
this.state={
    PlayerOne:null,
    PlayerTwo:null
}
 

}

GetData=(id,Player)=>{
    
    alert(id)
    alert(Player)
    this.setState({
        [id]:Player
    })

}

render(){
const {PlayerOne,PlayerTwo}=this.state;
    return(
        <React.Fragment>
          <Instructions /> 
          <div className='player input'>
              <h2 className='header'>Players</h2>
              <div style={{float:'left'}}>
                  {PlayerOne === null ?
              <FormP className='player1' onSubmit={(PlayerOne)=>this.GetData('PlayerOne',PlayerOne)} />
                  : 'nayeem'}
              </div>
              <div style={{float:'right'}}>
              <FormP className='player1'onSubmit={(PlayerTwo)=>this.GetData('PlayerTwo',PlayerTwo)} />

              </div>          </div>
        </React.Fragment>
    )
}


}

