import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="2379981670-piqlivt55r354b1qlgstas3vgr45lcnn.apps.googleusercontent.com">
    <App />
</GoogleOAuthProvider>
)
