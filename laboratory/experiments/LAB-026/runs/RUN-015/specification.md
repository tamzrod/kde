# CipherUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.441075Z
**Run ID**: RUN-015
**Seed**: 1700000015

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: timestamp_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: append_only_array
- Commit Method: majority_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: log_compaction

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: crash_recovery

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 486ms
- Election Timeout Base: 183ms
- Election Timeout Range: 84ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_if_no_voted
- log:value_log
- log_structure:append_only_array
- commit:majority_commit
- recovery:log_catchup
- snapshot:log_compaction
- dynamic_membership:remove_node
- failure_detection:gossip
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 55
- Elections Succeeded: 31
- Election Success Rate: 56.36%
- Messages Sent: 131
- Commits: 13
- Avg Messages/Commit: 10.08
- Leader Changes: 31
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 60
- Elections Succeeded: 52
- Election Success Rate: 86.67%
- Messages Sent: 285
- Commits: 22
- Avg Messages/Commit: 12.95
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 66
- Elections Succeeded: 47
- Election Success Rate: 71.21%
- Messages Sent: 306
- Commits: 15
- Avg Messages/Commit: 20.40
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 47
- Elections Succeeded: 42
- Election Success Rate: 89.36%
- Messages Sent: 508
- Commits: 18
- Avg Messages/Commit: 28.22
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

