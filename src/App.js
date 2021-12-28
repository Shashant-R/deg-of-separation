import { useState } from "react";
import { AppBar, Toolbar, IconButton, TextField, Button } from '@mui/material';
import { PeopleAltTwoTone, SearchRounded, DeleteRounded, SaveRounded, AddCircleOutlineRounded } from '@mui/icons-material';
import './App.css';
export default function App() {
  const [personA, setPersonA] = useState("");
  const [personB, setPersonB] = useState("");
  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");
  const [path, setPath] = useState([]);
  const [graph, setGraph] = useState(JSON.parse(localStorage.getItem('data')));
  const [deg, setDeg] = useState(99999);
  
  function updateA(event)
  {
    if(event.target.value==="")return;
    setPersonA(event.target.value);
  }
  function updateB(event)
  {
    if(event.target.value==="")return;
    setPersonB(event.target.value);
  }
  function updateQA(event)
  {
    if(event.target.value==="")return;
    setQueryA(event.target.value);
  }
  function updateQB(event)
  {
    if(event.target.value==="")return;
    setQueryB(event.target.value);
  }
  function addRelation()
  {
    console.log(personA +" is a friend of "+ personB);
    let clone = {...graph};
    if(clone[personA]===undefined)
    {
      clone[personA] = [personB];
    }
    else if(clone[personA].find(function (element){return element===personB})===undefined)
    {
      clone[personA].push(personB);
    }
    /*if(clone[personB]===undefined)
    {
      clone[personB] = [personA];
    }
    else if(clone[personB].find(function (element){return element===personA})===undefined)
    {
      clone[personB].push(personA);
    }*/
    setGraph(clone);
  }
  /*
  function trace()
  {
    var startNode = queryA;
    var destNode  = queryB;
    var res = [];
    
    var visited = {};
    var parent  = {};
    var q = [];
    if(startNode===destNode)
    {
      setPath(["Same Person"]);
      return;
    }
    if(graph[startNode]===undefined)
    {
      setPath([startNode+" not found in database"]);
      return;
    }
    if(graph[destNode]===undefined)
    {
      setPath([destNode+" not found in database"]);
      return;
    }
    
    visited[startNode] = true;
    q.push(startNode);
    while(q.length>0)
    {
      var currNode = q.shift();
      if(currNode === destNode)
        break;
      var currList = graph[currNode];
      for (let i in currList)
      {
        var child = currList[i];
        if(!visited[child])
        {
          visited[child] = true;
          parent[child] = currNode;
          q.push(child);
        }
      }
    }
    if(!visited[destNode])
    {
      setPath(["No relation"]);
      return;
    }
    while(parent[destNode]!==undefined)
    {
      res.push(destNode);
      destNode = parent[destNode];
    }
    res.push(startNode);
    res=res.reverse()
    console.log("path  = ", res);
    setPath(res);
    return 0;
  }*/
  function dfs(startNode, destNode, visited, res, level, listPaths)
  {
    res[level]=startNode;
    visited[startNode] = true;
    level+=1;
    if(startNode===destNode)
    {
      console.log(listPaths.length+"\n");
      let currPath = [];
      for(let i=0;i<level;i++)
      {
        console.log(res[i]);
        currPath.push(res[i]);
      }
      if(deg<currPath.length)
        setDeg(currPath.length);
      listPaths.push(currPath);
    }
    else
    {
      for(let i in graph[startNode])
      {
        let child = graph[startNode][i]
        if(!visited[child])
        {
          dfs(child, destNode, visited, res, level, listPaths);
        }
      }
    }
    level-=1;
    visited[startNode]=false;
  }
  function allPaths()
  {
    var startNode = queryA;
    var destNode  = queryB;
    var visited = {};
    var res = ["X"];
    var level = 0;
    var listPaths = [];
    if(startNode==="" || destNode==="")return;
    if(startNode===destNode)
    {
      setPath([["Same"]]);
      return;
    }
    if(graph[startNode]===undefined)
    {
      setPath([["Missing"]]);
      return;
    }
    /*
    if(graph[destNode]===undefined)
    {
      setPath([["Missing"]]);
      return;
    }*/
    dfs(startNode, destNode, visited, res, level, listPaths);
    if(listPaths.length===0)
      setPath([["Unrelated"]]);
    else 
      setPath(listPaths);
  }
  function save(){
    localStorage.setItem('data', JSON.stringify(graph));
    console.log(graph);
  }
  function reset(){
    localStorage.setItem('data', JSON.stringify({}));
    console.log(graph);
    setGraph({});
    setPath([]);
    setPersonA("");
    setPersonB("");
    setQueryA("");
    setQueryB("");
  }
  function printPath(path, num)
  {
    let ans = (num+1)+". ";
    for (let i=0; i<path.length; i++)
    {
      let node = path[i];
      ans+=node;
      if(i!==path.length-1)ans+=" > ";
    }
    return <h2>{ans}</h2>;
  }
  return (
    <>
      {/* Navigation bar at the top */}
      <AppBar 
        position="static" 
        color="secondary"
        >
        <Toolbar>
          <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
              <PeopleAltTwoTone 
                size="large"
                style={{marginRight: 10}}
              />
          </IconButton>
          
          <h2 className="title">Degrees of Separation</h2>
        </Toolbar>
      </AppBar>

      {/* Input field */}
      <div className="input-field">

        <TextField
            id="filled-search"
            label="Person A"
            type="text"
            variant="filled"
            onChange={updateA}
            style={{marginRight: 10}}
        />
        <h2
          className="subtext-in"
          display="inline-flex"
          style={{marginRight: 10}}
          >
          is a friend of
        </h2>
        <TextField
            id="filled-search"
            label="Person B"
            type="text"
            variant="filled"
            onChange={updateB}
            style={{marginRight: 10}}
        />
      </div>
      {/* Button for adding relationships and saving them in local memory */}
      <div className="add-save">
          <Button 
            startIcon={<AddCircleOutlineRounded/>}
            variant="contained" 
            type="submit" 
            onClick={addRelation} 
            style={{marginRight: 10}}
          >
            Add relationship
          </Button>
          <Button 
            startIcon={<SaveRounded/>}
            variant="contained" 
            color="success" 
            onClick={save}
            style={{marginRight: 10}}
          >
            Save Relations
          </Button>
      </div>
      {/* Query field */}
      <div className="query-field">
        <TextField
            id="filled-search"
            label="Query person A"
            type="text"
            variant="filled"
            onChange={updateQA}
            style={{marginRight: 10}}
        />
        <h2
          className="subtext-q"
          display="inline"
          style={{marginRight: 10}}
        >
          's degree of separation from 
        </h2>
        <TextField
            id="filled-search"
            label="Query person B"
            type="text"
            variant="filled"
            onChange={updateQB}
            style={{marginRight: 10}}
        />
        <h2 
          className="subtext-q"
          display="inline"
        > is ? 

        </h2>
      </div>

      <div className="path-reset">
        <Button 
          startIcon={<SearchRounded/>}
          variant="contained" 
          color="secondary" 
          onClick={allPaths}
          style={{marginRight: 10}}
        >
          Find Path
        </Button>
        <Button 
          startIcon={<DeleteRounded/>}
          variant="contained" 
          color="error" 
          onClick={reset}
          style={{marginRight: 10}}
        >
          Delete Relations
        </Button>
      </div>
      

      {/* Solution field */}
      <div className="sol-field">
        <p>
          {path.map((path, num)=>
            printPath(path, num)
          )}
        </p>
      </div>
    </>
  );
}
