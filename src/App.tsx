import {Text, TextField} from "@simplybusiness/mobius";
// @ts-expect-error theme import
import "@simplybusiness/theme-core";
import "./App.css";
import {AddressLookup} from "./components/AddressLookup/AddressLookup";
// import {Combobox} from "./components/Combobox/Combobox";
// import {Options} from "./components/Combobox/types";

// const options: Options = [
//   {id: "cat", text: "Cat", value: "Cat"},
//   {id: "dog", text: "Dog", value: "Dog"},
//   {id: "tiger", text: "Tiger", value: "Tiger"},
//   {id: "reindeer", text: "Reindeer", value: "Reindeer"},
//   {id: "raccoon", text: "Raccoon", value: "Raccoon"},
//   {id: "sloth", text: "Sloth", value: "Sloth"},
//   {id: "dolphin", text: "Dolphin", value: "Dolphin"},
//   {id: "flounder", text: "Flounder", value: "Flounder"},
//   {id: "eel", text: "Eel", value: "Eel"},
//   {id: "falcon", text: "Falcon", value: "Falcon"},
//   {id: "winged-horse", text: "Winged Horse", value: "Winged Horse"},
// ];
// const groupedOptions: Options = [
//   {
//     category: "Land",
//     options: [
//       {id: "cat", text: "Cat", value: "Cat"},
//       {id: "dog", text: "Dog", value: "Dog"},
//       {id: "tiger", text: "Tiger", value: "Tiger"},
//       {id: "reindeer", text: "Reindeer", value: "Reindeer"},
//       {id: "raccoon", text: "Raccoon", value: "Raccoon"},
//     ],
//   },
//   {
//     category: "Water",
//     options: [
//       {id: "dolphin", text: "Dolphin", value: "Dolphin"},
//       {id: "flounder", text: "Flounder", value: "Flounder"},
//       {id: "eel", text: "Eel", value: "Eel"},
//     ],
//   },
//   {
//     category: "Air",
//     options: [
//       {id: "falcon", text: "Falcon", value: "Falcon"},
//       {id: "winged-horse", text: "Winged Horse", value: "Winged Horse"},
//     ],
//   },
// ];

function App() {
  return (
    <div className="container">
      <Text elementType="h1">Combo Box</Text>
      <AddressLookup />
      {/* <Combobox
        label="Select an animal"
        options={options}
        onSelected={console.log}
      /> */}
      <TextField label="Name" />
      <TextField label="Address" />
    </div>
  );
}

export default App;
