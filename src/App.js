import { BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [orderBy, setOrderBy] = useState("asc");
  let [sortBy, setSortBy] = useState("petName");


  let filteredAppointmentList = appointmentList.filter((item) => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    );
  }).sort((a, b) => {
    let isOrderBy = orderBy === "asc" ? 1 : -1;
    if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
      return -1 * isOrderBy;
    } else if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
      return isOrderBy;
    } else {
      return 0;
    }
  });

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setAppointmentList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl"><BiArchive className="inline-block text-red-400 align-top" /> Your Appointments</h1>
      <Search
        query={query}
        searchQuery={myQuery => setQuery(myQuery)}
        orderBy={orderBy}
        sortBy={sortBy}
        onChangeSortBy={value => setSortBy(value)}
        onChangeOrderBy={value => setOrderBy(value)}
      />
      <AddAppointment
        onAddAppointment={appointment => setAppointmentList([...appointmentList, appointment])}
        lastId={appointmentList.reduce((prevVal, currVal) => Math.max(prevVal, currVal.id), 0)}
      />
      <ul className="divide-y divide-gray-200">
        {filteredAppointmentList
          .map(appointment => (
            <AppointmentInfo
              key={appointment.id}
              id={appointment.id}
              petName={appointment.petName}
              aptDate={appointment.aptDate}
              ownerName={appointment.ownerName}
              aptNotes={appointment.aptNotes}
              onDeleteAppointment={appointmentId => {
                setAppointmentList(appointmentList.filter(item => appointmentId !== item.id));
              }}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
