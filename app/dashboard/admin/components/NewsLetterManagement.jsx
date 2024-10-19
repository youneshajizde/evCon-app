import MyTable from "@/components/newsletterTable/MyTable";
import supabase from "@/lib/supabaseClient";
import { TicketX, UsersRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

function NewsLetterManagement() {
  const [approvedCount, setApprovedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [newsLetterUsers, setNewsLetterUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNewsLetterUsers = async () => {
    try {
      const { data: allUsers, error: allUsersError } = await supabase
        .from("newsletter")
        .select("*");

      if (allUsersError) {
        console.log("Error fetching users", allUsersError);
      } else {
        setApprovedCount(allUsers.filter(user => user.state === "approved").length);
        setCancelledCount(allUsers.filter(user => user.state === "cancelled").length);
        setNewsLetterUsers(allUsers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserState = (id, newState) => {
    setNewsLetterUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, state: newState } : user
      )
    );
  };

  const updateStateInSupabase = async (id, newState) => {
    try {
      const { error } = await supabase
        .from("newsletter")
        .update({ state: newState })
        .eq("id", id);

      if (error) {
        console.error("Error updating state:", error.message);
      } else {
        updateUserState(id, newState);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getNewsLetterUsers();
  }, []);

  if (loading)
    return (
      <FallingLines
        color="#f44336"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    );

  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-semibold">Manage the NewsLetter Users</h2>

      <div className="flex flex-col md:flex-row gap-9 mt-5">
        <div className="relative w-full md:w-[280px] min-h-[140px] bg-white rounded-xl border-[1px] flex items-center justify-center gap-5">
          <UsersRound size={50} />
          <span className="text-5xl font-semibold">{approvedCount}</span>
          <span className="absolute top-3 left-3 text-sm font-medium">
            Approved
          </span>
        </div>
        <div className="relative w-full md:w-[280px] min-h-[140px] bg-white rounded-xl border-[1px] flex items-center justify-center gap-5">
          <TicketX size={50} />
          <span className="text-5xl font-semibold">{cancelledCount}</span>
          <span className="absolute top-3 left-3 text-sm font-medium">
            Cancelled
          </span>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-lg font-medium">Users State</h1>
        <MyTable 
          data={newsLetterUsers} 
          updateStateInSupabase={updateStateInSupabase} 
        />
      </div>
    </main>
  );
}

export default NewsLetterManagement;
