## Opis struktury API dla projektu

#### Użytkownik

```prisma
model User {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  email       String
  hashPasswor String
  firstName   String?
  lastName    String?
}
```

#### Pola

```prisma
model Field {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  size      Float
  location  String
  crops     Crop[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
