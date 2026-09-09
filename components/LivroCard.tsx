// components/LivroCard.tsx
import { useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// Define o formato dos dados de um livro (tipagem usada pelo TypeScript)
interface Livro {
  capa: string;    // URL da imagem da capa
  titulo: string;  // Título do livro
  autor: string;   // Nome do autor
  sinopse?: string; // Descrição opcional do livro (se existir nos dados)
}

// Define as props que o componente LivroCard recebe
interface LivroCardProps {
  livro: Livro;
}

// Componente que exibe um card com capa, título e autor de um livro
// Ao tocar no card, abre um modal com os detalhes completos
export default function LivroCard({ livro }: LivroCardProps) {
  // Estado que controla se o modal de detalhes está visível ou não
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <>
      {/* Pressable torna o card inteiro tocável, abrindo o modal */}
      <Pressable
        style={({ pressed }) => [estilos.card, pressed && estilos.cardPressionado]}
        onPress={() => setModalVisivel(true)}
      >
        <Image source={{ uri: livro.capa }} style={estilos.capa} />
        <View style={estilos.info}>
          <Text style={estilos.titulo} numberOfLines={2}>
            {livro.titulo}
          </Text>
          <Text style={estilos.autor}>{livro.autor}</Text>
        </View>
      </Pressable>

      {/* Modal com os detalhes do livro, aberto ao tocar no card */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisivel(false)} // Botão de voltar do Android
      >
        {/* Fundo escurecido: tocar fora do card fecha o modal */}
        <Pressable style={estilos.fundo} onPress={() => setModalVisivel(false)}>
          {/* Pressable interno vazio impede que o toque no card feche o modal */}
          <Pressable style={estilos.modalCard} onPress={() => {}}>
            <Image source={{ uri: livro.capa }} style={estilos.capaGrande} />
            <Text style={estilos.modalTitulo}>{livro.titulo}</Text>
            <Text style={estilos.modalAutor}>{livro.autor}</Text>

            {/* Só mostra a sinopse se ela existir nos dados */}
            {livro.sinopse && (
              <Text style={estilos.modalSinopse}>{livro.sinopse}</Text>
            )}

            <Pressable
              style={estilos.botaoFechar}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={estilos.textoBotaoFechar}>Fechar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

// Estilos do componente
const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressionado: {
    opacity: 0.7, // Feedback visual ao tocar
  },
  capa: {
    width: 88,
    height: 132,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 22,
  },
  autor: {
    fontSize: 14,
    color: '#8a8a8a',
  },

  // Estilos do modal de detalhes
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Escurece o fundo da tela
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  capaGrande: {
    width: 140,
    height: 210,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalAutor: {
    fontSize: 15,
    color: '#8a8a8a',
    marginBottom: 12,
  },
  modalSinopse: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  botaoFechar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textoBotaoFechar: {
    color: '#fff',
    fontWeight: '700',
  },
});