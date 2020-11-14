import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component{

    state={
        longUrl:'',
        shortUrl:'',
        urlCode:'',
        clickCount:'',
        posts:[]
      }

      componentDidMount=()=>{
        this.getBlogPost();
      };

      getBlogPost =()=>{
        const URL = 'http://localhost:8080/api/allurls';
        console.log(URL);
        axios.get(URL)
        .then((response)=>{
          const data = response.data;
          this.setState({posts:data});
         
        })
        .catch((error)=>{
          
        });
      }

      handleChange =({target})=>{
        const {name,value} = target;
        console.log(name);
        console.log(value);
        this.setState({[name]:value});
    
      };
      submit=(event)=>{
        event.preventDefault();
        const payload={
            longUrl:this.state.longUrl
        };
        console.log("Payload:",payload);
        axios({
          url: 'http://localhost:8080/',
          method: 'POST',
          data: payload
        })
          .then(() => {
            console.log('Data has been sent to the server');
           
          })
          .catch(() => {
            console.log('Internal server error');
          });;
        };



      displayBlogPost = (posts) => {

        if (!posts.length) return null;
        return posts.map((post, index) => (
   

<tr>
    <td>
    {post.longUrl}
    </td>
    <td>
    {post.shortUrl}
    </td>
    <td>
    {post.clickCount}
    </td>

    </tr>


            
    
         
        ));
      };
    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <div className="form-input">
                        <input 
                        type="text" 
                        placeholder="Enter url to Shorten"
                        name="longUrl"
                        value={this.state.longUrl}
                        onChange={this.handleChange}>

                        </input>

                    </div>
                    <button>Submit</button>
                </form>
                <div className="blog-display">
                <table>
    <thead>
      <tr>
        <td>Long Url</td>
        <td>Short url</td>
        <td>no of times clicked</td>
      </tr>
    </thead>
    <tbody>
    {this.displayBlogPost(this.state.posts)}
    </tbody>
             </table>
                </div>

            </div>

        );
    }

}

export default App;