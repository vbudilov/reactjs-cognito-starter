const prod = {
    uploaderService: "https://demos.budilov.com/generic/api/v1",
    genericService: "https://demos.budilov.com/generic/api/v1",
    logLevel: 'INFO',
};

const dev = {
    uploaderService: "http://localhost:8080",
    genericService: "http://localhost:8080",
    logLevel: 'INFO',
};

export const config = process.env.NODE_ENV === "development" ? prod : prod;

// export const config = process.env.NODE_ENV === "development" ? prod : prod;
