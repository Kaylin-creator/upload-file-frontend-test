interface Director {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  interface DirectorDiff {
    added: Director[];
    removed: Director[];
    updated: {
      old: Director;
      new: Director;
      changes: string[];
    }[];
  }
  
  /**
   * Compares two arrays of directors and returns a diff showing added, removed, and updated directors
   * @param oldDirectors - Array of existing directors
   * @param newDirectors - Array of new directors to compare against
   * @returns DirectorDiff object containing lists of added, removed, and updated directors
   */
  export function compareDirectorLists(
    oldDirectors: Director[],
    newDirectors: Director[]
  ): DirectorDiff {
    const result: DirectorDiff = {
      added: [],
      removed: [],
      updated: [],
    };
  
    // Create maps for easier lookup
    const oldMap = new Map(oldDirectors.map(d => [d.id, d]));
    const newMap = new Map(newDirectors.map(d => [d.id, d]));
  
    // Find added and updated directors
    Array.from(newMap.entries()).forEach(([id, newDirector]) => {
      const oldDirector = oldMap.get(id);
      
      if (!oldDirector) {
        result.added.push(newDirector);
      } else {
        const changedFields = getChangedFields(oldDirector, newDirector);
        if (changedFields.length > 0) {
          result.updated.push({
            old: oldDirector,
            new: newDirector,
            changes: changedFields,
          });
        }
      }
    });
  
    // Find removed directors
    Array.from(oldMap.entries()).forEach(([id, oldDirector]) => {
      if (!newMap.has(id)) {
        result.removed.push(oldDirector);
      }
    });
  
    return result;
  }
  
  /**
   * Returns an array of field names that have changed between two director objects
   */
  function getChangedFields(oldDirector: Director, newDirector: Director): string[] {
    const changes: string[] = [];
  
    if (normalize(oldDirector.name) !== normalize(newDirector.name)) changes.push("name");
    if (normalizeEmail(oldDirector.email) !== normalizeEmail(newDirector.email)) changes.push("email");
    if (normalize(oldDirector.phone) !== normalize(newDirector.phone)) changes.push("phone");
  
    return changes;
  }
  
  /**
   * Normalizes strings by trimming whitespace.
   */
  function normalize(value: string): string {
    return value.trim();
  }
  
  /**
   * Normalizes email by trimming and converting to lowercase.
   */
  function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
  