import Container from "@/app/_components/container";
import  Hero  from "@/app/_components/hero";

import fs from "fs";
import YAML from "yaml";
import path from 'path';

async function getData() {
  const filePath = path.join(process.cwd(),  '_home.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return YAML.parse(fileContents);
}

export default async function Index() {
  const data = await getData();
  
  return (
    <main>
      <Container>
        <Hero data={data} />
      </Container>
    </main>
  );
}
