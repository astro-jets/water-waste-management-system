import axios from "axios";

export const getStatus = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/status", {
      timeout: 8000, // optional: protect UI from hanging
    });
    console.log("Status response:", res.data);
    return res.data; // axios already parses JSON
  } catch (err) {
    throw new Error("Server error");
  }
};

export const toggleAuto = async () => {
  await fetch("http://localhost:5000/api/auto/on");
};

export const manualDose = async (ammount: number) => {
  await fetch(`http://localhost:5000/api/pump/manual/${ammount}`);
};

// export const getStatus = async () => {
//   const res = await fetch("http://localhost:5000/api/status", {
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("Server error");

//   const data = await res.json();
//   return data;
// };
