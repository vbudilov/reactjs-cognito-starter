const prod = {
    endpointAfterRegistration: "/registerconfirm"
};

const dev = {
    endpointAfterRegistration: "/registerconfirm"
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
