import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Products from './pages/Products'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import Layout from './components/Layout'
import Search from './pages/Search'
import Orders from './pages/Orders'
import OrderDetail from './components/OrderDetail'
import ShoppingCart from './components/ShoppingCart'
import ProductInfo from './components/ProductInfo'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6fbf73'
    },
    secondary: blue
  },
  typography: {
    fontFamily : 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  },
  listItem:{
    fontFamily : 'Quicksand',
  },
  listItemText:{
    fontFamily : 'Quicksand',
  },
  button: {
    fontFamily : 'Quicksand',
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            {/* <Route path="/crawling">
            </Route> */}
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
