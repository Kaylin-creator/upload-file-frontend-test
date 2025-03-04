import { compareDirectorLists, Director } from "../utils/directorDiff";
import 'jest';

// Sample test cases for Jest

describe("compareDirectorLists", () => {
  const sampleDirector: Director = {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123456"
  };

  describe("when directors are added", () => {
    test("should detect a single new director", () => {
      const oldDirectors = [sampleDirector];
      const newDirectors = [
        sampleDirector,
        { id: "2", name: "Bob Smith", email: "bob@example.com", phone: "789012" }
      ];

      const result = compareDirectorLists(oldDirectors, newDirectors);

      expect(result.added).toHaveLength(1);
      expect(result.added[0]).toEqual({
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "789012"
      });
      expect(result.removed).toHaveLength(0);
      expect(result.updated).toHaveLength(0);
    });

    test("should detect multiple new directors", () => {
      const oldDirectors = [sampleDirector];
      const newDirectors = [
        sampleDirector,
        { id: "2", name: "Bob Smith", email: "bob@example.com", phone: "789012" },
        { id: "3", name: "Charlie Brown", email: "charlie@example.com", phone: "555666" }
      ];

      const result = compareDirectorLists(oldDirectors, newDirectors);

      expect(result.added).toHaveLength(2);
      expect(result.removed).toHaveLength(0);
      expect(result.updated).toHaveLength(0);
    });
  });

  describe("when directors are removed", () => {
    test("should detect a single removed director", () => {
      const oldDirectors = [
        sampleDirector,
        { id: "2", name: "Bob Smith", email: "bob@example.com", phone: "789012" }
      ];
      const newDirectors = [sampleDirector];

      const result = compareDirectorLists(oldDirectors, newDirectors);

      expect(result.removed).toHaveLength(1);
      expect(result.removed[0]).toEqual({
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "789012"
      });
      expect(result.added).toHaveLength(0);
      expect(result.updated).toHaveLength(0);
    });
  });

  describe("when directors are updated", () => {
    test("should detect email changes", () => {
      const oldDirectors = [sampleDirector];
      const newDirectors = [{
        ...sampleDirector,
        email: "alice.new@example.com"
      }];

      const result = compareDirectorLists(oldDirectors, newDirectors);

      expect(result.updated).toHaveLength(1);
      expect(result.updated[0]).toEqual({
        old: sampleDirector,
        new: { ...sampleDirector, email: "alice.new@example.com" },
        changes: ["email"]
      });
      expect(result.added).toHaveLength(0);
      expect(result.removed).toHaveLength(0);
    });

    test("should detect multiple field changes", () => {
      const oldDirectors = [sampleDirector];
      const newDirectors = [{
        ...sampleDirector,
        name: "Alice Smith",
        phone: "999999"
      }];

      const result = compareDirectorLists(oldDirectors, newDirectors);

      expect(result.updated).toHaveLength(1);
      expect(result.updated[0].changes).toEqual(["name", "phone"]);
    });
  });

  describe("when no changes occur", () => {
    test("should return empty arrays for all changes", () => {
      const directors = [sampleDirector];
      const result = compareDirectorLists(directors, directors);

      expect(result).toEqual({
        added: [],
        removed: [],
        updated: []
      });
    });
  });
});
