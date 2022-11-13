import React from "react";
import { useRouter } from "next/router";

const Notes = () => {
    const router = useRouter();
    const {id} = router.query;
    return <h1>Single Note page {id}</h1>
}

export default Notes