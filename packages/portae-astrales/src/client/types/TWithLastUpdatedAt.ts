type TWithLastUpdatedAt<Type> = Type & Record<'lastUpdatedAt', number>;

export default TWithLastUpdatedAt;
