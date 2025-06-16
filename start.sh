#!/bin/bash

# -------- COWOWES --------
GREEN='\033[0;32m'
NC='\033[0m' # sin cowow

echo -e "${GREEN}🌸 OwO~ Empezandowo wa instawación dew pwoyectito ToDo List App... nya~${NC}"

# -------- CLIENT --------
echo -e "${GREEN}📦 Instawando dependewcias dew c-wientito~ uwu${NC}"
cd Client
npm install
cd ..

# -------- SERVER --------
echo -e "${GREEN}📦 Instawando dependewcias dew sewvidowcito~ >w<${NC}"
cd Server
npm install

# -------- .ENV --------
if [ ! -f ".env" ]; then
  echo -e "${GREEN}⚙️  .env-chan no fue encontwado... ¡Vamos a cweaw uno nyu~! owo${NC}"
  cat <<EOF > .env
DB_NAME=todoListDB
DB_USER=postgres
DB_PASSWORD= minecraft3
DB_HOST=localhost
JWT_SECRET=una_clave_segura
EOF
else
  echo -e "${GREEN}✅ UwU~ Ya teníamos un .env existiendo, senpai~ no se tocó 💖${NC}"
fi

cd ..

# -------- FINISHU --------
echo -e "${GREEN}✅ ¡Ya está todo instawado, yay! ✨${NC}"
echo -e "${GREEN}🧠 Asegúrate de que tu basecita de datos esté cweadita en PostgweSQL primero~ nya~${NC}"
echo -e "${GREEN}🛠️ Usa dos tewminawes pa' iniciar el pweoyecto 💻"
echo -e "${GREEN}🌟 Teeeerminaw 1 → cd Server && npm run dev${NC}"
echo -e "${GREEN}🌟 Teeeerminaw 2 → cd Client && npm run dev${NC}"