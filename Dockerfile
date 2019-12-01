FROM ubuntu

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y python

RUN git clone https://github.com/SAP/node-rasp.git

WORKDIR /node-rasp
RUN apt-get install -y build-essential
RUN ./configure
RUN make -j4

WORKDIR /app

COPY . .

RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN npm install

CMD [ "../node-rasp/node", "app.js"]