# IOB — fundo fumê com ScrollTrigger

O vídeo existente agora acompanha a rolagem, sem autoplay ou loop. O vídeo fica fixo no fundo da página inteira e avança durante toda a rolagem; ao rolar para cima, ele retrocede. Uma camada fumê e um zoom discreto completam o efeito. Agendamento, textos, links e demais seções foram preservados.

## Executar

`python -m http.server 8080`, depois abra http://localhost:8080. Publicação estática na Vercel, sem build.

## Ajustar

- `scroll-background.js`: progresso da página inteira (`end: "max"`), suavização (`scrub`) e zoom.
- `styles.css`: camada fumê, brilho e saturação ao final do arquivo.
- `imagens/odontologia.mp4`: vídeo de odontologia otimizado para seek, sem áudio; poster em JPEG.
- `app.js`: bundle React original extraído do HTML, com autoplay e ondas removidos e integração ao efeito. Os fontes React originais não estavam disponíveis.
- `vendor/`: GSAP 3.13.0 e ScrollTrigger, com avisos de licença preservados.

A preferência por movimento reduzido mantém um fundo parado, sem fixar a seção. Falha na biblioteca ou no vídeo preserva a página sem bloquear a navegação. A busca de quadros aguarda o decoder, evitando uma fila de seeks.

Referência: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

Vídeo ilustrativo de Nadezhda Moryak / Pexels: https://www.pexels.com/video/a-dentist-treating-a-patient-7803281/
Licença consultada: https://www.pexels.com/license/ (07/11/2026). Trecho de 10 segundos, 960px, H.264, keyframes a cada 6 quadros para melhorar a navegação por rolagem.
