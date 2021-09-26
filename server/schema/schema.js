const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const Continents = require('../models/continent.model');
const Countries = require('../models/country.model');
const Languages = require('../models/language.model');

const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    native: { type: GraphQLString },
    rtf: { type: GraphQLString },
  })
});

const ContinentType = new GraphQLObjectType({
  name: 'Continent',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    native: { type: GraphQLString },
    phone: { type: GraphQLInt },
    capital: { type: GraphQLString },
    currency: { type: GraphQLString },
    languages: { type: new GraphQLList(LanguageType) },
    continentId: { type: GraphQLID },
    languages: {
      type: new GraphQLList(LanguageType),
      resolve(parent, args) {
        return Languages.find({ _id: { $in: parent.languages }})
      }
    },
    continent: {
      type: ContinentType,
      resolve(parent, args) {
        return Continents.findOne({ _id: parent.continentId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    country: {
      type: CountryType,
      args: { code: { type: GraphQLString }},
      resolve(parent, args) {
        return Countries.findOne({ code: args.code});
      }
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve(parent, args) {
        return Countries.find();
      }
    },
    continents: {
      type: new GraphQLList(ContinentType),
      resolve(parent, args) {
        return Continents.find();
      }
    },
    languages: {
      type: new GraphQLList(LanguageType),
      resolve(parent, args) {
        return Languages.find();
      }
    }
  }
});

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLanguage: {
      type: LanguageType,
      args: {
        code: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        native: { type: new GraphQLNonNull(GraphQLString) },
        rtf: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const language = new Languages({
          name: args.name,
          age: args.age,
          native: args.native,
          rtf: args.rtf,
        });
        return language.save();
      }
    },
    addContinent: {
      type: ContinentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const continent = new Continents({
          name: args.name,
          code: args.code,
        });
        return continent.save();
      }
    },
    addCountry: {
      type: CountryType,
      args: {
        code: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        native: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLInt) },
        capital: { type: new GraphQLNonNull(GraphQLString) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        continentId: { type: new GraphQLNonNull(GraphQLInt) },
        languages: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve(parent, args) {
        const country = new Countries({
          name: args.name,
          age: args.age,
          native: args.native,
          phone: args.phone,
          capital: args.capital,
          currency: args.currency,
          continentId: args.continentId,
          languages: args.languages,
        });
        return country.save();
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
