import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading"
import Panel from "./Panel";

//Fake Data
const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  //focused is indicated with PanelId 
  state = {
    loading : false,
    focused : null
  };

  // selectPanel = id => {
  //   this.setState({
  //    focused: id
  //   });
  // };

// if dashboard is on "Focused" state, then if we click again change the state to NULL 
  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }

  

  render() {
    
    // const dashboardClasses = classnames("dashboard");

    //THis allows Dashboard to show "focused" version
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });


    if (this.state.loading) {
      return <Loading />;
    }

   // if dashboard is clicked (focused) => data is filtered with focused PanelId otherwise all Panels are rendered 
    const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
   .map(panel => (
    <Panel
     key={panel.id}
     label={panel.label}
     value={panel.value}
     onSelect={event => this.selectPanel(panel.id)}
    />
   ));

    return  <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
