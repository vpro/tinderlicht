echo "EERST HUIDIGE ZOOI COMMITEN!!!!!!!!!!!!!!!!"
npm run deploy
git checkout gh-pages
cp -a $HOME/Desktop/Tinderlicht/build/* $HOME/Desktop/Tinderlicht/
git status
git add -A
git commit -m "gh page deploy"
git push
git checkout master