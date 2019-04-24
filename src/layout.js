import React from 'react'
import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonTabBar,
  IonRouterOutlet
} from '@ionic/react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <IonApp>
      <IonPage>
        <Router>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" exact={true}>
                {/* <IonTab tab="home"> */}
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>aaaaaaa</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>{children}</IonContent>
                {/* </IonTab> */}
              </Route>
              <Route path="/:tab(contacts)" exact={true}>
                {/* <IonTab tab="contacts" href="/"> */}
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>aaaaaaa</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>aaaaaaa</IonContent>
                {/* </IonTab> */}
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon name="home" />
              </IonTabButton>
              <IonTabButton tab="contacts" href="/contacts">
                <IonIcon name="contacts" />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Router>
      </IonPage>
    </IonApp>
  )
}

export default Layout
