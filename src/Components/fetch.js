export async function  fetchrepos(language){

    const end_point=(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=start&order=desc&type=Repositories`);
console.log(end_point)

    let response = await fetch(end_point);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
  let json = await response.json();

  if(!json.items){

    throw new Error('Error occured during fetch')
  }else{

    return json.items
  }

  
} else {
  alert("HTTP-Error: " + response.status);
}
  


}