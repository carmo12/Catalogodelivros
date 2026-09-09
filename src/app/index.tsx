// src/app/index.tsx
// -----------------------------------------------------------------------
// Tela inicial do app (Expo Router). Monta o catálogo de livros
// usando FlatList para renderizar a lista de forma performática.
// -----------------------------------------------------------------------

import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

// Caminhos relativos: como este arquivo está em src/app/,
// subimos duas pastas (../../) para chegar em components/ e data/
import LivroCard from '../../components/LivroCard';
import livros from '../../data/livros';

export default function Index() {
  return (
    <SafeAreaView style={estilos.container}>
      {/* Título fixo no topo da tela */}
      <Text style={estilos.tituloApp}>📚 Catálogo de Livros</Text>

      {/* FlatList renderiza a lista de livros de forma otimizada,
          criando apenas os itens visíveis na tela */}
      <FlatList
        data={livros}                                    // Array com os dados dos livros
        keyExtractor={(item) => item.id}                 // Chave única de cada item
        renderItem={({ item }) => <LivroCard livro={item} />} // Componente usado para cada livro
        contentContainerStyle={estilos.lista}             // Estilo do espaço interno da lista
        showsVerticalScrollIndicator={false}              // Esconde a barrinha de rolagem
      />
    </SafeAreaView>
  );
}

// Estilos da tela
const estilos = StyleSheet.create({
  container: {
    flex: 1,                    // Ocupa toda a tela disponível
    backgroundColor: '#f7f7f8', // Fundo cinza bem claro
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: '800',          // Bem destacado
    textAlign: 'center',        // Centralizado horizontalmente
    marginTop: 12,
    marginBottom: 20,           // Espaço entre o título e a lista
    color: '#222',
  },
  lista: {
    paddingHorizontal: 20,      // Respiro nas laterais dos cards
    paddingBottom: 24,          // Espaço no final da lista
    maxWidth: 600,              // Evita que a lista fique "esticada" em telas largas (web)
    width: '100%',
    alignSelf: 'center',        // Centraliza a lista horizontalmente na tela
  },
});