FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install Node.js dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

RUN apt-get update && apt-get install -y python3 python3-pip dos2unix

COPY requirements.txt .
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# Copy all project files
COPY ./ ./

RUN find . -name "*.sh" -exec dos2unix {} \;

# Install frontend dependencies
WORKDIR /app/controllers/web/SinisterBeesFrontend
RUN npm install

WORKDIR /app/bin
RUN chmod +x ./runProject.sh

CMD ["./runProject.sh"]
