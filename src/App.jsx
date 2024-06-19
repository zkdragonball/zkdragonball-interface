
import router from './router';


function App() {

const routeElements = router();

  return (
    <div>
        {routeElements}
    </div>  
  )
}

export default App